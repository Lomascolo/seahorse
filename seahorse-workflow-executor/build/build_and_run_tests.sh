#!/bin/bash -ex
# Copyright 2016 deepsense.ai (CodiLime, Inc)
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.


TASKS="clean scalastyle test:scalastyle test it:compile ds-it"
#sbt -DSPARK_VERSION=2.0.0 $TASKS
#sbt -DSPARK_VERSION=2.0.1 $TASKS
#sbt -DSPARK_VERSION=2.1.0 $TASKS
sbt -DSPARK_VERSION=2.1.1 $TASKS
sbt -DSPARK_VERSION=2.0.2 $TASKS
sbt -DSPARK_VERSION=1.6.1 $TASKS
