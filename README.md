# node-api
### Content
This project contains an API that allow user to introduce and retrieve some data.
It is documented with swagger.

This solution is prepared to be deployed in a production environment, in kubernetes cluster. Helm templates files were prepared to be deployed

### Tech stack
```sh
docker
nodeJS 14
k3d
helm
k8s
swagger
mongoDB
```
### Trying in local

To deploy this project in your local environment you need to have installed:
- [k3d](https://k3d.io/v4.4.8/#installation)
- [helm](https://helm.sh/docs/intro/install/)

In order to run in local enviroment it is deployed a MondoDB instance in k3s cluster.


### Installation

Once you have installed all the requirements you can run the script `install.sh`.

This will install k3s cluster into your local machine and will expose port `8081` in order to access to ingress controller.

You can open `swagger` documentation on `http://localhost:8081/docs` once it is deployed

### Project

The goal of this project is to create a minimalistic solution that save's users information into a database and retrieve it back. 
Everything was templated with helm `/helm` and parametized in the `values.yaml` file.

** **This database solution would not be for a production environment. Some other solution with persistance storage would be required.**

### Resources

This solution creates:
- `deployment`
    - replicaset of `N` pods
- `serviceAccount` with admin permissions (TODO: adjust permissions to once needed)
- `namespace` for all the resources `xurtasun`
- `horizontalAutoscallingGroup` that fix `minPods` in `1` and `maxPods` in `2` depeneding on `% CPU`
- `service` that expose internally the `pods` ports
- simple `ingress` controller that routes trafic to the service

### Tests

All the test are located in `src/test`. Since I have no in depth experience developing unit test, it is known that better solution could be done and more test could be developed.

