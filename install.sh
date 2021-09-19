#!/bin/bash
set -e

k3d cluster create -p "8081:80@loadbalancer"

helm install v1 ./helm/