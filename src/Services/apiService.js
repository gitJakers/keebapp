// const url = "http://keyboardapi.azurewebsites.net/"; //Live 
// const url = "http://localhost:5196/"; // Local Testing 
const url = "http://localhost:5196/";

const GetAllBuilds = async () => {
    return fetch(`${url}Builds/AllBuilds`)
        .then(resp => resp.json())
        .then(data => data)
}

const GetUserById = async (userId) => {
    return fetch(`${url}User/GetUserById/${userId}`)
    .then(resp => resp.json())
    .then(data => data)
}

const GetUserByUsername = async (username) => {
    return fetch(`${url}User/GetUserByUsername/${username}`)
        .then(resp => resp.json())
        .then(data => data)
}

const AddNewBuild = async (buildToAdd, userId) => {
    return fetch(`${url}Builds/AddBuild`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "Id": 0,
            "UserId": userId,
            "UploadDate": buildToAdd.UploadDate,
            "LikeCount": 0,
            "Name": buildToAdd.Name,
            "Keycaps": buildToAdd.Keycaps,
            "Switches": buildToAdd.Switches,
            "Pcb": buildToAdd.Pcb,
            "Plates": buildToAdd.Plates,
            "Case": buildToAdd.Case,
            "Cables": buildToAdd.Cables,
            "Controller": buildToAdd.Controller,
            "Description": buildToAdd.Description,
            "Deleted": false,
        })
    })
        .then(resp => resp.json())
        .then(data => data)
}

const GetBuildsByUserId = async (userId) => {
    return fetch(`${url}Builds/UserBuilds/${userId}`)
        .then(resp => resp.json())
        .then(data => data)
}

const Login = async (username, password) => {
    return fetch(`${url}User/Login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "Username": username,
            "Password": password
        })
    })
        .then(resp => resp.json())
        .then(data => data)
}

const CreateAccount = async (username, password) => {
    return fetch(`${url}User/AddUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "Id": 0,
            "Username": username,
            "Password": password
        })
    })
        .then(resp => resp.json())
        .then(data => data)
}

const GetUsernameByUserId = async(UserId) => {
    return fetch(`${url}User/GetUserById/${UserId}`)
    .then(resp => resp.json())
    .then(data => data.username)
}

const SaveBuild = async (userId, buildId) => {
    return fetch(`${url}Saved/SaveBuild`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "Id": 0,
            "UserId": userId,
            "BuildId": buildId
        })
    })
        .then(resp => resp.json())
        .then(data => data)
}

const UnsaveBuild = async (buildToUnsave) => {
    return fetch(`${url}Saved/RemoveBuild`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "Id": buildToUnsave.id,
            "UserId": buildToUnsave.userId,
            "BuildId": buildToUnsave.buildId
        })
    })
        .then(resp => resp.json())
        .then(data => data)
}

const GetSavedBuildsByUserId = async (userId) => {
    return fetch(`${url}Saved/GetUserSavedBuilds/${userId}`)
        .then(resp => resp.json())
        .then(data => data)
}

let savedBuilds = [];
const GetSavedBuildsById = async (buildArray) => {
    buildArray.map(async (build) => {
        const resp = await fetch(`${url}Builds/BuildById/${build.buildId}`)
        const data = await resp.json();
        savedBuilds.push(data);
    })
}

function GetSavedBuilds(){
    return savedBuilds;
}

const UploadComment = async (commentToAdd, userId, buildId, userName) => {
    return fetch(`${url}Comments/AddComment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "Id": 0,
            "BuildId": buildId,
            "UserId": userId,
            "UploadDate": new Date(),
            "LikeCount": 0,
            "Comment": commentToAdd,
            "Username": userName
        })
    })
        .then(resp => resp.json())
        .then(data => data)
}

const UpdateComment = async (commentToUpdate, userId, buildId) => {
    return fetch(`${url}Comments/UpdateCommentById`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "Id": commentToUpdate.Id,
            "BuildId": buildId,
            "UserId": userId,
            "UploadDate": commentToUpdate.uploadDate,
            "LikeCount": commentToUpdate.likeCount,
            "Comment": commentToUpdate.comment
        })
    })
        .then(resp => resp.json())
        .then(data => data)
}

const GetCommentsByUserId = async (userId) => {
    return fetch(`${url}Comments/UserComments/${userId}`)
        .then(resp => resp.json())
        .then(data => data)
}

const GetCommentsByBuildId = async (buildId) => {
    return fetch(`${url}Comments/BuildComments/${buildId}`)
    .then(resp => resp.json())
    .then(data => data)
}

const UploadImage = async (file, buildName) => {
    fetch(`${url}Builds/uploadImage/${buildName}`, {
        method: "POST",
        headers: {
            "Accept": "application/json"
        },
        body: file
    })
}

export { GetUserById, GetSavedBuilds, GetCommentsByBuildId, GetUsernameByUserId, GetSavedBuildsById, UploadImage, AddNewBuild, GetAllBuilds, Login, CreateAccount, GetUserByUsername, UploadComment, GetCommentsByUserId, UpdateComment, GetBuildsByUserId, SaveBuild, UnsaveBuild, GetSavedBuildsByUserId } 