import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  processHeadshot,
  isAllowedMime,
  MAX_HEADSHOT_BYTES,
} from "@/lib/headshot";

export const runtime = "nodejs";

async function getUserId() {
  const session = await auth();
  if (!session?.user) return null;
  const userId = (session.user as { id?: string }).id;
  if (!userId || typeof userId !== "string") return null;
  return userId;
}

export async function GET() {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { headshot: true },
  });

  if (!user?.headshot || user.headshot.length === 0) {
    return new NextResponse(null, { status: 404 });
  }

  return new NextResponse(user.headshot, {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "private, max-age=60",
    },
  });
}

export async function POST(req: Request) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("image") ?? form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "Please upload an image file (image, file)." },
      { status: 400 }
    );
  }

  if (file.size > MAX_HEADSHOT_BYTES) {
    return NextResponse.json(
      { error: `Image too large (max ${MAX_HEADSHOT_BYTES / 1024 / 1024}MB).` },
      { status: 400 }
    );
  }

  if (!isAllowedMime(file.type)) {
    return NextResponse.json(
      { error: "Invalid format. Use JPG, PNG, or WebP." },
      { status: 400 }
    );
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const processed = await processHeadshot(buffer);

    await prisma.user.update({
      where: { id: userId },
      data: { headshot: new Uint8Array(processed) },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Headshot upload error:", err);
    return NextResponse.json(
      { error: "Failed to process image." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.user.update({
    where: { id: userId },
    data: { headshot: null },
  });

  return NextResponse.json({ ok: true });
}
