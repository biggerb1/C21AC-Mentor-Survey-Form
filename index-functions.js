updateAgentsList();

var sliders = document.getElementsByClassName('slider');
for (var a in sliders) {
    sliders[a].oninput = function() {
        var output = document.getElementById(this.getAttribute('data-valuecontainerID'));
        output.innerHTML = formatSliderValue(this.value, this.getAttribute('data-slidertype'));
    }
}

function formatSliderValue(rawValue, sliderFormat) {
    var returnvalue = rawValue;
    if (sliderFormat == '0to100percent') {
        returnvalue = (rawValue * 10) + '%';        
    }
    return returnvalue;
}

function showLoading() {
    document.getElementById("handle_loadingoverlay").style.display = "block";
}

function hideLoading() {
    document.getElementById("handle_loadingoverlay").style.display = "none";
}

function updateAgentsList() {
    showLoading();
    var http = new XMLHttpRequest();
    var URL = 'https://clarkrealestate.org/resources/agentspage/get.php';
    http.open("GET", URL, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send();
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            systemupdate_agentslist(JSON.parse(http.responseText));
        }
    };
}

function systemupdate_agentslist(agentList) {
    var choiceList = [];
    var x;
    for (x in agentList) {        
        var fullname = agentList[x].firstname + ' ' + agentList[x].lastname;
        var curstring = '<option value="' + fullname + '">' + fullname + '</option>';
        choiceList.push(curstring);
    }
    document.getElementById("handle_agentselector").innerHTML = choiceList.join('\n');    
    hideLoading();
}
    