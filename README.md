
<h2>Created by Imteajul Islam Saimun.<h2>
<h2>I used my own express baekend for this project instead of assignments provided json-server<h2>

# Project Plan - Chat Application with RTK Query

## Requirement Analysis

1. user can register. after registering, user will be automatically logged in, we will store login info to localStorage (for login persistance) and redirected to inbox page

2. user can login and after login we will save the login information in localStorage (for login persistance) and redirect user to inbox

3. load sidebar messages from conversation API and implement load more feature

4. load specific conversation messages when user clicks on it and implement load more feature

5. when user sends message,
   a) if conversation id is present, update conversation table and also inserts into messages table
   b) if conversation id is missing, get conversation id using filter
   _ if conversation id exists, then update that conversation and add to messages table
   _ if conversation id is missing, insert that conversation and add to messages table

6. sidebar conversation list scroll - sort by latest first and when user loads more, bring previous "10 conversations sorted by latest first" and pushed into the conversations array

7. messages list scroll - bring "10 latest messages per request sorted by oldest first". when user loads more, "bring previous 10 messages sorted again by oldest first" and unshift into the array

## Required APIs

1. register
2. login
3. get list of users other than requesting user
4. update conversation
5. insert conversation
6. find conversation
7. list conversation
8. list messages by conversation id
9. send message (insert messages into messages table)


<!-- HOW TO RUN -->

## ![rocketIcon][rocketicon-shield] How to run

Please follow the below instructions to run this branch in your machine:

1. Login to the GitHub account on which you have been granted access to this repository. If you have purchased the course but didn't get the access to this repository, please contact our support team. You will find contact details below.

2. Clone this repository -
   ```sh
   git clone https://github.com/Saimun-jd/think-in-a-redux-way
   ```
3. Go to the cloned project directory
   ```sh
   cd think-in-a-redux-way
   ```
4. Install dependencies
   ```sh
   npm i
   ```
5. Install VS Code [Live Server plugin](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) & start the server.
   ```sh
   npm start
   ```
6. Your app should be available in http://localhost:3000

<br>

Please follow the below instructions to run server in your machine:

1. Go to the chat-backend directory(first clone the repo from https://github.com/Saimun-jd/chat-backend)
   ```sh
   cd chat-backend
   ```
2. Install dependencies
   ```sh
   npm i
   ```
3. Start the server
   ```sh
   npm start
   ```

<br>

<!-- CONTACT  -->

## ![contactIcon][contacticon-shield] Contact us

[![Facebook][facebook-shield]][facebook-url]
[![mail][mail-shield]][mail-url]

<!-- MARKDOWN LINKS & IMAGES -->

[youtube-shield]: https://img.shields.io/badge/-Youtube-black.svg?style=flat-square&logo=youtube&color=555&logoColor=white
[youtube-url]: https://youtube.com/LearnwithSumit
[facebook-shield]: https://img.shields.io/badge/-Facebook-black.svg?style=flat-square&logo=facebook&color=555&logoColor=white
[facebook-url]: https://facebook.com/Saimunjd.8
[facebook-group-url]: https://facebook.com/groups/learnwithsumit
[instagram-shield]: https://img.shields.io/badge/-Instagram-black.svg?style=flat-square&logo=instagram&color=555&logoColor=white
[instagram-url]: https://instagram.com/learnwithsumit
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/company/learnwithsumit
[thumbnail-shield]: https://i.ibb.co/d6hxnvd/Screenshot-50.png
[mail-shield]: https://img.shields.io/badge/%F0%9F%93%A7%20Email-saimuncoder@gmail.com-lightgray
[mail-url]: saimuncoder@gmail.com
[tableofcontent-shield]: https://img.icons8.com/external-flatart-icons-flat-flatarticons/28/undefined/external-direction-business-and-teamwork-flatart-icons-flat-flatarticons.png
[htmlicon-shield]: https://img.icons8.com/external-flaticons-flat-flat-icons/28/undefined/external-html-computer-programming-flaticons-flat-flat-icons.png
[servericon-shield]: https://img.icons8.com/external-itim2101-flat-itim2101/28/undefined/external-server-network-technology-itim2101-flat-itim2101-2.png
[rocketicon-shield]: https://img.icons8.com/arcade/30/undefined/experimental-rocket-arcade.png
[contacticon-shield]: https://img.icons8.com/external-flaticons-lineal-color-flat-icons/28/undefined/external-support-communication-media-flaticons-lineal-color-flat-icons.png
