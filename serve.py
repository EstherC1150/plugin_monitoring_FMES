import http.server
import socketserver
import os

PORT = 8080
DIRECTORY = "./plugin"

class CORSRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

def main():
    if not os.path.exists(DIRECTORY):
        print(f"Error: Directory '{DIRECTORY}' not found.")
        return

    handler = CORSRequestHandler
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        print(f"--- Nextspace Plugin Local Dev Server ---")
        print(f"Serving at: http://localhost:{PORT}")
        print(f"Serving directory: {os.path.abspath(DIRECTORY)}")
        print(f"CORS is ENABLED (Allow-Origin: *)")
        print(f"Cache-Control is DISABLED (no-cache)")
        print(f"Press Ctrl+C to stop.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nStopping server...")
            httpd.server_close()

if __name__ == "__main__":
    main()
