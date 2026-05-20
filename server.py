from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
from pathlib import Path
import re


ROOT = Path(__file__).resolve().parent
SAVE_DIR = ROOT / "saved_sequences"


class GMetronomeHandler(SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path != "/save-sequence":
            self.send_error(404)
            return

        length = int(self.headers.get("Content-Length", "0"))
        try:
            payload = json.loads(self.rfile.read(length).decode("utf-8"))
            contents = str(payload.get("contents", ""))
            requested_name = str(payload.get("fileName", "chord-sequence.chords.txt"))
        except (json.JSONDecodeError, UnicodeDecodeError):
            self.send_error(400, "Invalid JSON")
            return

        safe_name = re.sub(r"[^A-Za-z0-9_.-]+", "-", requested_name).strip(".-")
        if not safe_name:
            safe_name = "chord-sequence.chords.txt"
        if not safe_name.endswith(".txt"):
            safe_name += ".txt"

        SAVE_DIR.mkdir(exist_ok=True)
        target = SAVE_DIR / safe_name
        target.write_text(contents, encoding="utf-8")

        response = {
            "ok": True,
            "path": str(target),
        }
        encoded = json.dumps(response).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(encoded)))
        self.end_headers()
        self.wfile.write(encoded)


if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", 4173), GMetronomeHandler)
    print("Serving GMetronome on http://127.0.0.1:4173/")
    server.serve_forever()
