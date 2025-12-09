# Accessing the App on Your Phone

## Quick Setup

1. **Make sure your phone and computer are on the same WiFi network**

2. **Find your computer's local IP address:**

   **Windows (PowerShell):**
   ```powershell
   ipconfig
   ```
   Look for "IPv4 Address" under your WiFi adapter (usually starts with 192.168.x.x or 10.x.x.x)

   **Windows (Command Prompt):**
   ```cmd
   ipconfig
   ```

   **Mac/Linux:**
   ```bash
   ifconfig
   ```
   or
   ```bash
   ip addr show
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **On your phone's browser, navigate to:**
   ```
   http://YOUR_IP_ADDRESS:3000
   ```
   
   Example: `http://192.168.1.100:3000`

## Troubleshooting

- **Can't connect?** Make sure Windows Firewall allows connections on port 3000
- **Still not working?** Try disabling your firewall temporarily to test
- **Connection refused?** Make sure both devices are on the same WiFi network (not mobile data)

## Firewall Settings (Windows)

If you need to allow port 3000 through Windows Firewall:

1. Open Windows Defender Firewall
2. Click "Advanced settings"
3. Click "Inbound Rules" → "New Rule"
4. Select "Port" → Next
5. Select "TCP" and enter port "3000"
6. Allow the connection
7. Apply to all profiles
8. Name it "Vite Dev Server"

