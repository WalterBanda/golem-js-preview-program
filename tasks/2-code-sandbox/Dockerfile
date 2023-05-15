# --------------------------------------------------- #
# This dockerfile setups the app container and gets   #
# it running with the correct configurations          #
# --------------------------------------------------- #

FROM debian:stable-slim

WORKDIR /usr/golem/app

# Dependacy setup stage
RUN apt update && apt install -y git curl nodejs gnupg

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt update && apt install -y yarn


# Golem setup stage
RUN curl -L https://github.com/golemfactory/yagna/releases/download/v0.12.0/golem-requestor-linux-v0.12.0.tar.gz -o /usr/golem/golem-requestor.tar.gz && \
    tar -xf /usr/golem/golem-requestor.tar.gz -C /usr/bin
RUN yagna --version
RUN gftp --version

CMD ["yagna", "service" ,"run"]

# Network configurations
CMD ["yagna", "app-key", "create", "requestor"]
CMD ["yagna", "payment", "fund"]
CMD ["yagna", "payment", "status"]

ENTRYPOINT ["yarn", "serve.js"]
