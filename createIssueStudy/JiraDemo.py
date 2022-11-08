import requests
import json
import warnings
from requests.auth import HTTPBasicAuth
warnings.filterwarnings("ignore")

username = "intern"
password = "hackbot"
base_url = "https://172.16.102.106/jira/rest/api/2/issue/"

headers = {"Accept": "application/json", "Content-Type": "application/json"}

payload = json.dumps(
    {
        "fields": {
            "project": {"key": "HFTD"},
            "parent":{"name":"testing 3"},
            "summary": "testing 3",
            "description": " ",
            "issuetype": {"name": "Bug"},
            "priority": {"name": "Highest"},
            "labels":["testing"],
            "assignee":{"name":"intern"}
        }
    }
)

if __name__ == "__main__":
    try:
        response = requests.post(
            base_url,
            data=payload,
            headers=headers,
            auth=HTTPBasicAuth(username, password),
            verify=False,
        )

        data = response.json()
        print(data)
    except Exception as e:
        print(e)
