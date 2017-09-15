/**
 * Copyright 2015, deepsense.ai
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package ai.deepsense.deeplang.doperations.spark.wrappers.estimators

import ai.deepsense.commons.utils.Version
import ai.deepsense.deeplang.DOperation.Id
import ai.deepsense.deeplang.documentation.SparkOperationDocumentation
import ai.deepsense.deeplang.doperables.spark.wrappers.estimators.IDFEstimator
import ai.deepsense.deeplang.doperables.spark.wrappers.models.IDFModel
import ai.deepsense.deeplang.doperations.EstimatorAsOperation

class IDF extends EstimatorAsOperation[IDFEstimator, IDFModel]
    with SparkOperationDocumentation {

  override val id: Id = "36d31a98-9238-4159-8298-64eb8e3ca55a"
  override val name: String = "IDF"
  override val description: String = "Computes the Inverse Document Frequency (IDF) " +
    "of a collection of documents"

  override protected[this] val docsGuideLocation =
    Some("ml-features.html#tf-idf")
  override val since: Version = Version(1, 0, 0)
}