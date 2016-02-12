FROM ewolff/docker-java

RUN wget http://downloads.typesafe.com/typesafe-activator/1.3.7/typesafe-activator-1.3.7.zip
RUN unzip typesafe-activator-1.3.7.zip -d / && chmod a+x /activator-dist-1.3.7/activator
ENV PATH $PATH:/activator-dist-1.3.7

ADD app /grafit/app
ADD conf /grafit/conf
ADD project /grafit/project
ADD public /grafit/public
ADD activator /grafit/activator
ADD activator-launch-1.3.7.jar /grafit/activator-launch-1.3.7.jar
ADD build.sbt grafit/build.sbt

RUN apk update && apk upgrade && \
    apk add curl wget bash tree && \
    echo -ne "Alpine Linux 3.1 image. (`uname -rsv`)\n" >> /root/.built

EXPOSE 81:9000
WORKDIR /grafit

ENTRYPOINT ["activator", "run"]