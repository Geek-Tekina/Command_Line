let input = document.querySelector("input");
let terminalBody = document.querySelector("#terminalBody");

let commandList = [['about', 'find something about me'],['socials', 'connect to me on social media'], ['clear', 'clean the terminal'], ['echo', 'print you\'re word'], ['github', 'head towards my GitHub profile.'], ['contact', 'contact me.<br>arguments:<br> &nbsp;&nbsp;&nbsp;&nbsp;--name your name.<br> &nbsp;&nbsp;&nbsp;&nbsp;--email your email, I will reply on this.<br> &nbsp;&nbsp;&nbsp;&nbsp;--msg your words for me.']];

functionCalls();

function functionCalls() {
    checkWindowClick();
    checkPressedEnter();
}

function checkWindowClick() {
    terminalBody.addEventListener('click', function (event) {
        // console.log("clicked!");
        input.focus();
    });
}

function checkPressedEnter() {
    input.addEventListener('keydown', function (e) {
        // console.log("function");
        if (e.key === 'Enter') {
            console.log("Enter");
            execute(input.value);
        }
    });
}

function execute(inputValue) {
    let temp = input.value;
    input.remove();
    terminalBody.innerHTML += temp;
    checkCommand(temp);
    addInput();
}

function checkCommand(inputCommand) {

    let command = inputCommand.split(" ")[0];
    let contactCommand = inputCommand.split(" ");
    // console.log("input command : ", contactCommand);
    // console.log("condition : ", command.slice(0, 7) === 'contact')
    if (command) {
        if (command === 'about') { commandAbout(); }
        else if (command === 'clear') { commandClear(); }
        else if (command === 'echo') { commandEcho(inputCommand); }
        else if (command === 'github') { commandGithub(); }
        else if (command === 'help') { commandHelp(); }
        else if (command === 'name') { commandName(); }
        else if (command === 'projects') { commandProject(); }
        else if (command === 'resume') { commandResume(); }
        else if (command === 'socials') { commandSocial(); }
        else if (command.slice(0, 7) === 'contact') { commandContact(contactCommand); }
        else {
            terminalBody.innerHTML += '<br>' + inputCommand + ' is not recognized as a command, Try \"help\"<br>';
        }
    }
    else {
        terminalBody.innerHTML += '<br>';
    }
}

function addInput() {
    terminalBody.innerHTML += ' > <input type="text" style="width: 85%;" autofocus />';
    input = document.querySelector("input");
    input.focus();
    functionCalls();
}

function commandAbout() {

    terminalBody.innerHTML += '<br><br>';
    for (let i = 0; i < data.bio.length; i++) {
        terminalBody.innerHTML += `${data.bio[i].name}: `;
        terminalBody.innerHTML += `${data.bio[i].value}<br>`;
    }
    terminalBody.innerHTML += '<br>';
}

function commandName() {
    terminalBody.innerHTML += `<br>${data.name}<br>`;
}

function commandClear() {
    terminalBody.innerHTML = ``;
}

function commandHelp() {
    // terminalBody.innerHTML += '<br><br><table>';
    var table = '<table cellspacing=5 cellpadding=5>';
    for (let i = 0; i < commandList.length; i++) {
        table += `<tr><td valign="top">${commandList[i][0]}</td><td>${commandList[i][1]}</td></tr>`;
    }
    table += '</table>';
    console.log(table);
    terminalBody.innerHTML += table;
    terminalBody.innerHTML += '<br>'
    // terminalBody.innerHTML += '</table>';
}

function commandGithub() {
    terminalBody.innerHTML += `<br><i class="fa fa-github"> <a href="https://github.com/${data.github}" target="_blank">${data.github}</a><br>`;
    terminalBody.innerHTML += '<br>';
}

function commandContact(contactCommand) {
    // here we submit the form
    // TODO: seprate all arguments, send post request to submit the form
    var name = "", email = "", msg = "";
    for (let i = 0; i < contactCommand.length; i++) {
        if (contactCommand[i].toLowerCase() == "--name") {
            for (var j = i + 1; j < contactCommand.length; j++) {
                if (contactCommand[j] != "--msg" && contactCommand[j] != "--email") {
                    name += contactCommand[j] + " ";
                }
                else {
                    break;
                }
            }
        }
    }

    for (let i = 0; i < contactCommand.length; i++) {
        if (contactCommand[i].toLowerCase() == "--email") {
            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(contactCommand[i + 1])) {
                email = contactCommand[i + 1];
            }
            else {
                terminalBody.innerHTML += "<br>Invalid email address, please try again.<br>";
                return;
            }
        }
    }

    for (let i = 0; i < contactCommand.length; i++) {
        if (contactCommand[i].toLowerCase() == "--msg") {
            for (var j = i + 1; j < contactCommand.length; j++) {
                if (contactCommand[j] != "--name" && contactCommand[j] != "--email") {
                    msg += contactCommand[j] + " ";
                }
                else {
                    break;
                }
            }
        }
    }

    if (name.length != 0 && msg.length != 0) {
        var data = {
            name: name,
            email: email,
            msg: msg
        }
        Pageclip.send('siNDkH8txnnZYwV8giyWALId1iwF5Eq7', 'contact-form', data, function (error, response) {
            if(error) {
                alert('something went wrong!');
                console.log('error');
            }
            else if(response.data =='ok'){
                alert('response recorded.');
            }
        })
    }
    else {
        console.log('argument missing')
        terminalBody.innerHTML += '<br> something is missing, please try again.'
    }
    terminalBody.innerHTML += `<br>`;
}

function commandSocial() {

    terminalBody.innerHTML += '<br><br>';
    for (let i = 0; i < data.socials.length; i++) {
        terminalBody.innerHTML += `<a href="${data.socials[i].url}" target="_blank" style="text-decoration:none; margin-left:8px;"><span class="${data.socials[i].icon}"></span></a> `
    }
    terminalBody.innerHTML += '<br>';
}

function commandProject() {

    terminalBody.innerHTML += '<br><br>';
    for (let i = 0; i < data.projects.length; i++) {      
        terminalBody.innerHTML += `${data.projects[i].name}: `;
        terminalBody.innerHTML += `<a href="${data.projects[i].url}" target="_blank">${data.projects[i].url}</a><br>`;
    }
    terminalBody.innerHTML += '<br>';
}

function commandResume() {
    terminalBody.innerHTML += `<br><a href=assets/${data.resume}>Resume</a><br>`;
}


function commandEcho(inputCommand) {
    terminalBody.innerHTML += '<br>';
    for (let i = 1; i < inputCommand.split(' ').length; i++) {
        terminalBody.innerHTML += inputCommand.split(' ')[i] + ' ';
    }
    terminalBody.innerHTML += '<br>';

}