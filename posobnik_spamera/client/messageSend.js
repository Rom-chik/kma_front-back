'use strict';

//send mails constants by id's
const sendMailOne = document.getElementById('send-mail--1');
const sendMailTwo = document.getElementById('send-mail--2');
const sendMailThree = document.getElementById('send-mail--3');
const sendMailCustom = document.getElementById('send-mail-custom');

//initialization values (starting)
//no init values

//send mails buttons
sendMailOne.addEventListener('click', async() => {
    console.log(document.getElementById('text--1').textContent);
    const message = {
        from: '',
        to: "",
        subject: "Testing new feature on university project (update)",
        text: document.getElementById('text--1').textContent
    }
    console.log(message);
    await axios.post("/sendMail", {
        data: message
    });
});
sendMailTwo.addEventListener('click', async() => {
    console.log(document.getElementById('text--2').textContent);
    const message = {
        from: '',
        to: "",
        subject: "Testing new feature on university project (update)",
        text: document.getElementById('text--2').textContent
    }
    console.log(message);
    await axios.post("/sendMail", {
        data: message
    });
});
sendMailThree.addEventListener('click', async() => {
    console.log(document.getElementById('text--3').textContent);
    const message = {
        from: '',
        to: "",
        subject: "Testing new feature on university project (update)",
        text: document.getElementById('text--3').textContent
    }
    console.log(message);
    await axios.post("/sendMail", {
        data: message
    });
});
sendMailCustom.addEventListener('click', async() => {
    console.log(document.getElementById('text--4').textContent);
    const message = {
        from: '',
        to: "",
        subject: "Testing new feature on university project (update)",
        text: document.getElementById('text--4').textContent
    }
    console.log(message);
    await axios.post("/sendMail", {
        data: message
    });
});
