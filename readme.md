# Project Name

A simple web-based voting and discussion platform that allows users to vote on topics and leave feedback or notes on a discussion board.

### Running the Local Server

Once the project is cloned, Follow these steps to view your project on your local machine and mobile device:

1. **Navigate to your project directory** in the terminal:
   cd /path/to/your/project

2. **Start the local server** using Python:
   - If you are using **Python 3.x**, run:
     python -m http.server 8000
   - If you are using **Python 2.x**, run:
     python -m SimpleHTTPServer 8000

   This will start a local server on port 8000.

3. **Find your local IP address**:
   - On **Windows**, open Command Prompt and type:
     ipconfig
     Look for your **IPv4 Address** under the network adapter you're connected to.

   - On **Mac/Linux**, run:
     ifconfig
     Look for your **inet** address.

4. **Access the project on your phone**:
   - On your phone, open a web browser and type in the following URL:
     http://<your-ip-address>:8000
     Replace `<your-ip-address>` with the IPv4 address you found in step 3.

   This should allow you to view the project on your phone.