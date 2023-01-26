



<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->

<div>
<h3 align="center">Incourage Software Engineer Interview Test</h3>
<video src="https://user-images.githubusercontent.com/28855068/214912585-043f6f2f-651a-48dd-9d56-4ad3924e3451.mp4" > </video>
<h4>Exercise</h4>
  <p align="center">
   
The purpose of this exercise is to demonstrate core competencies around system design and
architecture, operation, and management of a system.

● Using JavaScript, build a basic demo app that allows customers to file insurance
claims. Customers should be able to do so via USSD, SMS, and Telegram (choose at
least 2, keeping in mind that more channels can be added in the future).


● Build a pipeline to automatically build and deploy this app in a cloud environment (pick
any, ideally one with a free tier so you don’t spend money on the demo) when changes
are pushed to the code repository.
  </p>
</div>

### Built With

- [Node js](https://nodejs.org/en/download/)


<!-- GETTING STARTED -->
## Getting Started

This repo impements a telegram bot and a USSD based solution using Africa's Talking.

View the API documentation on [Postman](https://www.postman.com/wamzy/workspace/incourage-test/example/2737072-2f2f1c10-6e68-40ba-a0bd-89564aefbe08)
![](images/postman-documentation.png)

### Telegram bot
To test the telegram bot, interact with it at http://t.me/incouragebot


### USSD service

To interact with the USSD service on sandbox mode:

1. Create an Africa's Talking developer account
2. Launch the USSD simulator and use https://incourage.wamaithanyamu.com/ussd as the callback url.
   


### Local Development Installation

To run the project on your local machine ensure you have [docker](https://docs.docker.com/get-docker/) and [docker-compose](https://docs.docker.com/compose/gettingstarted/) up and running. To setup a callbackurl for USSD and a webhook for Telegram use `Ngrok` or a similar service for exposing the localnetwork on the internet.

1. Clone the repo
   ```sh
   git clone https://github.com/wamaithaNyamu/IncourageTest.git
   ```
2. Navigate to the cloned repo
   ```sh
    cd IncourageTest
   ```
  
3. Give the `dev.sh` bash script execution permissions
   ```sh
    chmod 700 ./dev.sh
   ```
4. Create a .env file and add the following values. 
   ```shell
    MONGO_INITDB_ROOT_USERNAME=root
    MONGO_INITDB_ROOT_PASSWORD=very-secret-password
    MONGODB_CONNSTRING=mongodb://root:very-secret-password@mongo:27017/mydb?directConnection=true&authSource=admin&replicaSet=replicaset&retryWrites=true
    AFRICAS_TALKING_API_KEY=
    CLAIMS_URL=http://backend:7000/api/claims/
    USERS_URL=http://backend:7000/api/users/
    BACKEND_SERVICE_PORT=7000
    TELEGRAM_SERVICE_PORT=5004
    TELEGRAM_API=
    CALLBACK_URL=this_can_also_be_a_ngrok_url_for_dev_mode
    OPENAI_API_KEY=
   ```

5. Run ngrok on port `5004`(TELEGRAM PORT) and `8080` (USSD PORT). Use the Ngrok ouput for port `5004` as the `CALLBACK_URL` in the `.env`. Use the ngrok URL as the callback url on Africa's Talking USSD service in the form `https://ngrok-url-on-port-8080/ussd`
   ```sh
   ngrok http 5004
   ngrok http 8080
   ```
6. Use postman or insomnia to make requests to the backend. The backend has three routes: 
   - `/api/users`
   - `/api/claims`
   - `/api/policies`

![](images/users.png)
![](images/claims.png)
![](images/policies.png)
<p align="right">(<a href="#top">back to top</a>)</p>

### Production Development Installation

#### Option 1
In the `terraform` directory create the file `terraform.tfvars` and add the following:

```sh
linode-token="add_token_here_within_the_quotes"
root_pass="generate_a_strong_password_and_add_it_here_between_this_quotes"

```

Run the Terraform setup script that spins up a new ubuntu VM on Linode, generates ssh keys , saves the ip address on the inventory.ini, logs in to the VM and pastes the public key.

```sh
  ./terraform_setup.sh

```

Add the values in the `.env` as secrets on Github

#### Option 2

- Setup your own server on any cloud hosting platform
- Copy your public key to the server.
- Paste the server IP in `inventory.ini`



See the [open issues](https://github.com/wamaithaNyamu/IncourageTest.git/issues) for a full list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.
<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact
Tweet me at- [@wamaithanyamu](https://twitter.com/wamaithanyamu) or shoot me an email at hello@wamaithanyamu.com

Project Link: [https://github.com/wamaithaNyamu/IncourageTest.git](https://github.com/wamaithaNyamu/IncourageTest.git)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/wamaithanyamu/Lipa-na-Mpesa-STK-Push-.svg?style=for-the-badge
[contributors-url]: https://github.com/wamaithaNyamu/IncourageTest.git/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/wamaithanyamu/Lipa-na-Mpesa-STK-Push-.svg?style=for-the-badge
[forks-url]: https://github.com/wamaithaNyamu/IncourageTest.git/network/members
[stars-shield]: https://img.shields.io/github/stars/wamaithanyamu/Lipa-na-Mpesa-STK-Push-.svg?style=for-the-badge
[stars-url]: https://github.com/wamaithaNyamu/IncourageTest.git/stargazers
[issues-shield]: https://img.shields.io/github/issues/wamaithanyamu/Lipa-na-Mpesa-STK-Push-.svg?style=for-the-badge
[issues-url]: https://github.com/wamaithaNyamu/IncourageTest.git/issues
[license-shield]: https://img.shields.io/github/license/wamaithanyamu/Lipa-na-Mpesa-STK-Push-.svg?style=for-the-badge
[license-url]: https://github.com/wamaithaNyamu/IncourageTest.git/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/wamaithanyamu


