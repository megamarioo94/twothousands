"""Generate HUEstory QR after the site has a real public HTTPS URL."""
import sys
from urllib.parse import urlparse
if len(sys.argv) != 2 or urlparse(sys.argv[1]).scheme != 'https' or not urlparse(sys.argv[1]).netloc:
    raise SystemExit('Usage: python3 make_qr.py https://YOUR-ACTUAL-DEPLOYED-URL/')
try:
    import qrcode
    import qrcode.image.svg
except ImportError:
    raise SystemExit('Install the QR dependency first: pip install "qrcode[pil]"')
url=sys.argv[1]
qr=qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_H,box_size=14,border=4)
qr.add_data(url);qr.make(fit=True)
qr.make_image(fill_color='#141414',back_color='white').save('HUEstory-QR.png')
qr.make_image(image_factory=qrcode.image.svg.SvgPathImage).save('HUEstory-QR.svg')
print('QR now links to:',url)
