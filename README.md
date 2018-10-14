## Getting Started

Clone the repo

### Prerequisites

```
Python 3 w/ libraries:
    qrcode
    requests
    Pillow
    threading
Computer with a compatible wifi adapter that has monitor mode
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
sudo IFACE=en0 ./sniff-probes.sh
```

## Deployment

```
Scan the QR code titled with 'fr'. It will prompt you to join a fake networkm 
This will be the number you will use to interact with the virtual assistant by sending text messages.
```

## Usage

```
/menu

Shows the main menu containing a variety of options
```
```
/say <message>

Broadcast message to all users in the chat channel
```
```
@<user>

Private message a user with the given user ID
```
```
/find <item>

This will query the Wayfair api for the request item
```
```
/mute

This will prevent all messages from the chat channel from appearing
```
```
/unmute

This will enable messages to appear on for you
```



## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

