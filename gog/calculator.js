var currentXP = 0;
var currentLevel = 1;
var targetXP = 1;
var targetLevel = 1;
var XPRequired = 1;

var woodcutting = [
    {"name": "logs", "level": 1, "camplevel": 10, "xp": 25},
    {"name": "oakLogs", "level": 10, "camplevel": 20, "xp": 50},
    {"name": "ashLogs", "level": 20, "camplevel": 30, "xp": 75},
    {"name": "furLogs", "level": 30, "camplevel": 40, "xp": 100},
    {"name": "kingMapleLogs", "level": 40, "camplevel": 50, "xp": 125}, 
    {"name": "magicLogs", "level": 50, "camplevel": 60, "xp": 150}];

var mining = [
    {"name": "clayOre", "level": 1, "camplevel": 10, "xp": 12},
    {"name": "copperOre", "level": 1, "camplevel": 10, "xp": 25},
    {"name": "ironOre", "level": 10, "camplevel": 20, "xp": 50},
    {"name": "coalOre", "level": 20, "camplevel": 30, "xp": 75},
    {"name": "neleniteOre", "level": 30, "camplevel": 40, "xp": 100},
    {"name": "gothiteOre", "level": 40, "camplevel": 50, "xp": 125},
    {"name": "osmiumOre", "level": 50, "camplevel": 60, "xp": 150},
]

function setWoodcutting() {
    skill = woodcutting;
    calculateActions();
}

function setMining() {
    skill = mining;
    calculateActions();
}

function getCurrentXP() {
    currentXP = Number(document.getElementById("currentXPField").value);
    if (currentXP < 0) {
        currentXP = 0;
        document.getElementById("currentXPField").value = 0;
    }
    else if (currentXP < 61) {
        currentLevel = 1;
    }
    else {
        currentLevel = Math.min(100, Math.max(1, Math.floor(Math.pow(currentXP - 19, 1/3.4)) - 1));
    }
    document.getElementById("currentLevelField").value = currentLevel;
    calculateXPRequired();
};

function getCurrentLevel() {
    // Check if the field is empty. Number(empty) will evaluate to 0. If the 
    // field is empty, we want to leave it (so user can replace value).
    if (document.getElementById("currentLevelField").value.length == 0) {
        currentLevel = 1;
        currentXP = 0;
    }
    else {
        // Check the value has changed, and user has not just clicked or tabbed into the field
        enteredLevel = Number(document.getElementById("currentLevelField").value);
        if (enteredLevel !== currentLevel) {
            if (enteredLevel < 1) {
                currentLevel = 1;
                document.getElementById("currentLevelField").value = 1;
                currentXP = 0;
            }
            else if (enteredLevel == 1) {
                currentLevel = 1;
                currentXP = 0;
            }
            else if (enteredLevel > 100) {
                currentLevel = 100;
                document.getElementById("currentLevelField").value = 100;
                currentXP = Math.ceil(Math.pow(currentLevel + 1, 3.4) + 19);
            }
            else {
                currentLevel = enteredLevel;
                currentXP = Math.ceil(Math.pow(currentLevel + 1, 3.4) + 19);
            }
        }
    }
    document.getElementById("currentXPField").value = currentXP;
    calculateXPRequired(); 
}

function getTargetXP() {
    if (document.getElementById("targetXPField").value.length == 0) {
        targetXP = 1;
    }
    else {
        targetXP = Number(document.getElementById("targetXPField").value);
    }
    if (targetXP < 1) {
        targetXP = 1;
        document.getElementById("targetXPField").value = 1;
        targetLevel = 1;
    }
    else if (targetXP < 20) {
        targetLevel = 1;
    }
    else {
        targetLevel = Math.min(100, Math.max(1, Math.floor(Math.pow(targetXP - 19, 1/3.4)) - 1));
    }
    document.getElementById("targetLevelField").value = targetLevel;
    calculateXPRequired();
};

function getTargetLevel() {
    // Check if the field is empty. Number(empty) will evaluate to 0. If the 
    // field is empty, we want to leave it (so user can replace value).
    if (document.getElementById("targetLevelField").value.length == 0) {
        targetLevel = 1;
        targetXP = 1;
    }
    else {
        // Check the value has changed, and user has not just clicked or tabbed into the field
        enteredLevel = Number(document.getElementById("targetLevelField").value);
        if (enteredLevel !== targetLevel) {
            if (enteredLevel < 1) {
                targetLevel = 1;
                document.getElementById("targetLevelField").value = 1;
                targetXP = 1;
            }
            else if (enteredLevel == 1) {
                targetLevel = 1;
                targetXP = 1;
            }
            else if (enteredLevel > 100) {
                targetLevel = 100;
                document.getElementById("targetLevelField").value = 100;
                targetXP = Math.ceil(Math.pow(targetLevel + 1, 3.4) + 19);
            }
            else {
                targetLevel = enteredLevel;
                targetXP = Math.ceil(Math.pow(targetLevel + 1, 3.4) + 19);
            }
        }
    }
    document.getElementById("targetXPField").value = targetXP;
    calculateXPRequired();
};

function calculateXPRequired() {
    if (currentXP < targetXP) {
        XPRequired = targetXP - currentXP;
        document.getElementById("XPRequiredMessage").innerHTML = XPRequired.toLocaleString();
        calculateActions();
    }
    else {
        XPRequired = 0;
        document.getElementById("XPRequiredMessage").innerHTML = "You have already reached your goal!";
        calculateActions();
    }
}

function calculateActions() {
    for (var i = 0; i < skill.length; i++) {
        var actionsRequired = Math.ceil(XPRequired / skill[i]["xp"]).toLocaleString();
        document.getElementById(skill[i]["name"] + "Actions").innerHTML = actionsRequired;
        if (currentLevel >= skill[i]["level"]) {
            document.getElementById(skill[i]["name"] + "Requirement").innerHTML = "&#10004";
            document.getElementById(skill[i]["name"] + "Requirement").style.color = "green";
        }
        else if (targetLevel >= skill[i]["level"]) {
            document.getElementById(skill[i]["name"] + "Requirement").innerHTML = "&#8212";
            document.getElementById(skill[i]["name"] + "Requirement").style.color = "orangered";
        }
        else {
            document.getElementById(skill[i]["name"] + "Requirement").innerHTML = "&#10008";
            document.getElementById(skill[i]["name"] + "Requirement").style.color = "red";
        }

        // Only fill in camps if the skill (and therefore table) has them
        if (typeof(skill[i]["camplevel"]) !== "undefined") {
            if (currentLevel >= skill[i]["camplevel"]) {
                document.getElementById(skill[i]["name"] + "CampRequirement").innerHTML = "&#10004";
                document.getElementById(skill[i]["name"] + "CampRequirement").style.color = "green";
            }
            else if (targetLevel >= skill[i]["camplevel"]) {
                document.getElementById(skill[i]["name"] + "CampRequirement").innerHTML = "&#8212";
                document.getElementById(skill[i]["name"] + "CampRequirement").style.color = "orangered";
            }
            else {
                document.getElementById(skill[i]["name"] + "CampRequirement").innerHTML = "&#10008";
                document.getElementById(skill[i]["name"] + "CampRequirement").style.color = "red";
            }
        }
    }
}

