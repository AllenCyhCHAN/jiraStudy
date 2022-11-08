const axios = require("axios");
const https = require("https");

const username = "intern";
const password = "hackbot";
//const basicAuth = "Basic " + username + ":" + password;
const base_url = "https://172.16.102.106/jira/rest/api/2/issue/";
const headers = {
  "Accept": "application/json",
  "Content-Type": "application/json",
};

const agent = new https.Agent({
  rejectUnauthorized: false, // accept self-signed certificate
});

function createIssue() {
  const bodyData = {
    update:{},
    fields: {
      project: { key: "HFTD" },
      parent: { name: "testing 7" },
      summary: "testing 7",
      description: " ",
      issuetype: { name: "Bug" },
      priority: { name: "Highest" },
      labels: ["testing"],
      assignee: { name: "intern" },
    },
  };
  
  const config = {
    method: "post",
    url: base_url,
    headers: {
      headers,
      //Authorization: basicAuth,
    },
    data: bodyData,
  };
  
  axios.post(config.url, config.data, { 
    httpsAgent: agent, 
    headers: config.headers, 
    auth: { username: username, password } })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
}


function addAttachment(issueID, fileNamePath) {
  const FormData = require('form-data');
  const fs = require('fs');

  const form = new FormData();
  const stats = fs.statSync(filePath);
  const fileSizeInBytes = stats.size;
  const fileStream = fs.createReadStream(filePath);

  form.append('file', fileStream, { knownLength: fileSizeInBytes });

  const url = `${base_url}/${issueID}/attachments`;
  
  axios.post(url , form, { 
    httpsAgent: agent, 
    headers: config.headers, 
    auth: { username: username, password } })
      .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
}

const filePath = "jira testing.xlsx";
const issueID = "";