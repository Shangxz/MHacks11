## Getting Started

Clone the repo

### Prerequisites

```
Python 3
Computer with a compatible wifi adapter that has monitor mode
```

### Installing

Install Python 3
then run:

```
pip install qrcode
pip install requests
pip install Pillow
pip install threading
```

## Running the scripts

Run these on on terminal instances:
```
sudo python3 sniff_send.py
sudo python3 check_unique.py
```

Before running this line, make sure you have the right device number
The default on Apple Macbook is en0
```
IFACE=en0 ./sniff-probes.sh
```

## Deployment

```
Scan the QR code titled with 'fr' then 'sn' will appear.
You will then be brought to a number to initiate a text send.
This will be the number you will use to interact with the virtual assistant by sending text messages.
```

## Usage

```
/menu

Shows the menu that contains information regarding all options
```
```
/say <message>

Broadcast message to all user in the chat room
```
```
@<user>

Private message a user at their given user ID
```
```
/find <topic>

This will find the nearest store/restaurant that satisfies the topic given. This data will be pulled from Four Square
```
```
/who <picture>

By taking a picture and then typing this command, the virtual assistant will tell you which famous people are in the picture
```
``` 
/what <picture>

Same with /who, this will tell you what objects are in the photo
```
```
/upload-pic <picture>

Same with /who, this will upload a profile picture to your account
```
```
/device -- deprecated
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

