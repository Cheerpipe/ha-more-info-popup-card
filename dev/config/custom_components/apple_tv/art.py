"""Cover art drawn here, so the docs don't depend on an image download."""
import struct
import zlib

WIDTH, HEIGHT = 240, 360


def _png(rows: list[bytes]) -> bytes:
    def chunk(kind: bytes, data: bytes) -> bytes:
        body = kind + data
        return struct.pack(">I", len(data)) + body + struct.pack(">I", zlib.crc32(body))

    header = struct.pack(">IIBBBBB", WIDTH, HEIGHT, 8, 2, 0, 0, 0)
    raw = b"".join(b"\x00" + row for row in rows)
    return (
        b"\x89PNG\r\n\x1a\n"
        + chunk(b"IHDR", header)
        + chunk(b"IDAT", zlib.compress(raw, 9))
        + chunk(b"IEND", b"")
    )


def cover() -> bytes:
    """A winter poster: icy sky, a deep blue moon, snowy ground."""
    rows = []
    for y in range(HEIGHT):
        row = bytearray()
        t = y / HEIGHT
        for x in range(WIDTH):
            r, g, b = int(205 - 150 * t), int(232 - 120 * t), int(250 - 60 * t)
            if (x - 140) ** 2 + (y - 150) ** 2 < 62**2:
                r, g, b = 38, 112, 196
            if y > 300 - (x % 60) // 3:
                r, g, b = 240, 246, 252
            row += bytes((r, g, b))
        rows.append(bytes(row))
    return _png(rows)


COVER = cover()
