# Golem JS Preview Program Feedback Form

## Introduction
Thank you for taking the time to complete this Golem JS Preview Program task! 
We appreciate your effort in helping us gather valuable feedback and suggestions on how to improve the Golem Network. 
Please fill out the following form to provide your feedback and estimated completion times for each task step.

## Task: #2 - Code Sandbox

### Estimated completion time:
| Task Step                                                                        | Completion Time (in minutes) |
|----------------------------------------------------------------------------------|------------------------------|
| Convert the docker image to a GVMI image and publish it to receive an image hash | 120                          |
| Create an HTML template                                                          | 240                          |
| Add an execution code in Golem JS API                                            | 150                          |

### Feedback:
Please provide any feedback you have regarding each task step below:

#### Step 1: Convert the docker image to a GVMI image and publish it to receive an image hash

The following error is raised when building gvm images especially when docker has to pull images from the registry,
I was able to solve it by downgrading `requests to 2.28.2` from this form [OjusWizard Feedback form](https://github.com/OjusWiZard/golem-js-preview-program/blob/master/tasks/1-text-2-speech/FEEDBACK.md)
```
Traceback (most recent call last):
  File "/workspace/Work/Freelance/Golem/golem-js-preview-program/tasks/2-code-sandbox/.venv/lib/python3.10/site-packages/docker/api/client.py", line 214, in _retrieve_server_version
    return self.version(api_version=False)["ApiVersion"]
  File "/workspace/Work/Freelance/Golem/golem-js-preview-program/tasks/2-code-sandbox/.venv/lib/python3.10/site-packages/docker/api/daemon.py", line 181, in version
    return self._result(self._get(url), json=True)
  File "/workspace/Work/Freelance/Golem/golem-js-preview-program/tasks/2-code-sandbox/.venv/lib/python3.10/site-packages/docker/utils/decorators.py", line 46, in inner
    return f(self, *args, **kwargs)
  File "/workspace/Work/Freelance/Golem/golem-js-preview-program/tasks/2-code-sandbox/.venv/lib/python3.10/site-packages/docker/api/client.py", line 237, in _get
    return self.get(url, **self._set_request_timeout(kwargs))
  File "/workspace/Work/Freelance/Golem/golem-js-preview-program/tasks/2-code-sandbox/.venv/lib/python3.10/site-packages/requests/sessions.py", line 600, in get
    return self.request("GET", url, **kwargs)
  File "/workspace/Work/Freelance/Golem/golem-js-preview-program/tasks/2-code-sandbox/.venv/lib/python3.10/site-packages/requests/sessions.py", line 587, in request
    resp = self.send(prep, **send_kwargs)
  File "/workspace/Work/Freelance/Golem/golem-js-preview-program/tasks/2-code-sandbox/.venv/lib/python3.10/site-packages/requests/sessions.py", line 701, in send
    r = adapter.send(request, **kwargs)
  File "/workspace/Work/Freelance/Golem/golem-js-preview-program/tasks/2-code-sandbox/.venv/lib/python3.10/site-packages/requests/adapters.py", line 486, in send
    resp = conn.urlopen(
  File "/workspace/Work/Freelance/Golem/golem-js-preview-program/tasks/2-code-sandbox/.venv/lib/python3.10/site-packages/urllib3/connectionpool.py", line 790, in urlopen
    response = self._make_request(
  File "/workspace/Work/Freelance/Golem/golem-js-preview-program/tasks/2-code-sandbox/.venv/lib/python3.10/site-packages/urllib3/connectionpool.py", line 496, in _make_request
    conn.request(
TypeError: HTTPConnection.request() got an unexpected keyword argument 'chunked'

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "/workspace/Work/Freelance/Golem/golem-js-preview-program/tasks/2-code-sandbox/.venv/bin/gvmkit-build", line 8, in <module>
    sys.exit(build())
  File "/workspace/Work/Freelance/Golem/golem-js-preview-program/tasks/2-code-sandbox/.venv/lib/python3.10/site-packages/gvmkit_build/build.py", line 115, in build
    client = DockerClient.from_env()
  File "/workspace/Work/Freelance/Golem/golem-js-preview-program/tasks/2-code-sandbox/.venv/lib/python3.10/site-packages/docker/client.py", line 96, in from_env
    return cls(
  File "/workspace/Work/Freelance/Golem/golem-js-preview-program/tasks/2-code-sandbox/.venv/lib/python3.10/site-packages/docker/client.py", line 45, in __init__
    self.api = APIClient(*args, **kwargs)
  File "/workspace/Work/Freelance/Golem/golem-js-preview-program/tasks/2-code-sandbox/.venv/lib/python3.10/site-packages/docker/api/client.py", line 197, in __init__
    self._version = self._retrieve_server_version()
  File "/workspace/Work/Freelance/Golem/golem-js-preview-program/tasks/2-code-sandbox/.venv/lib/python3.10/site-packages/docker/api/client.py", line 221, in _retrieve_server_version
    raise DockerException(
docker.errors.DockerException: Error while fetching server API version: HTTPConnection.request() got an unexpected keyword argument 'chunked'
```

#### Step 2: Create an HTML template

I had no issues on this stage

#### Step 3: Add an execution code in Golem JS API

A bug occured from the `Accounts.create` fn when passing the `yagnaOptions` parameter where an reference exception is raised for `process`. Upon inspection, its visible that there is a try to source appkey shell env from this `e?.yagnaOptions?.apiKey || process.env.YAGNA_APPKEY;`, 
I tried creating a polyfill for process using an object containing env but that raised the `Error: Api key not defined`. I was able to observe that the api works flawless for nodejs runtimes but hidden bugs like this appear when utilizing the cdn from the experimenting on a react version
of the code sandbox. I would like to suggest that the js api devs bundle polyfills when compiling for browser runtimes. The error trace is below.
```
index.html?_ijt=gelhsga713krhr3uq1gf20rf71&_ij_reload=RELOAD_ON_SAVE:239 (index)Value(index)Value0'shell'1'node --version'2'shell'3'9373b61297eb41ec86d5cbe2c76eac7b'Array(4)
yajsapi.min.js:1  Uncaught (in promise) ReferenceError: process is not defined
    at new uh (yajsapi.min.js:1:247255)
    at hh.create (yajsapi.min.js:1:249481)
    at createAllocation (index.html?_ijt=gelhsga713krhr3uq1gf20rf71&_ij_reload=RELOAD_ON_SAVE:167:48)
    at index.html?_ijt=gelhsga713krhr3uq1gf20rf71&_ij_reload=RELOAD_ON_SAVE:240:36
uh @ yajsapi.min.js:1
create @ yajsapi.min.js:1
createAllocation @ index.html?_ijt=gelhsga713krhr3uq1gf20rf71&_ij_reload=RELOAD_ON_SAVE:167
(anonymous) @ index.html?_ijt=gelhsga713krhr3uq1gf20rf71&_ij_reload=RELOAD_ON_SAVE:240
Promise.then (async)
run @ index.html?_ijt=gelhsga713krhr3uq1gf20rf71&_ij_reload=RELOAD_ON_SAVE:240
(anonymous) @ index.html?_ijt=gelhsga713krhr3uq1gf20rf71&_ij_reload=RELOAD_ON_SAVE:235
```


## General feedback:
Is there anything else you'd like to share about your experience 
completing this task or using the Golem Network in general? 

Great technology that could change the way people think of blockchains. The API Docs are easy to understand but I suggest if it's possible to centralize the docs to one given page.

### Suggestions for Improvement

- Providing different types of inputs in the executor API, especially support for streams ie file streams etc
- More documentation on the supported features of docker file or containers

Thank you for your feedback and for contributing to the Golem Network!
