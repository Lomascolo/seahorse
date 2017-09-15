/**
 * Copyright 2015, deepsense.io
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

package io.deepsense.deeplang.doperables

import org.apache.spark.mllib.linalg.{Vector => SparkVector}
import org.apache.spark.mllib.tree.model.RandomForestModel
import org.apache.spark.rdd.RDD
import org.mockito.Matchers._
import org.mockito.Mockito._

import io.deepsense.deeplang.doperables.machinelearning.randomforest.RandomForestParameters
import io.deepsense.deeplang.doperables.machinelearning.randomforest.regression.TrainedRandomForestRegression

class TrainedRandomForestRegressionIntegSpec extends TrainedTreeRegressionIntegSpec {

  override def trainedRegressionName: String = "TrainedRandomForestRegression"

  override def createMockTrainedRegression(
    featureColumnNames: Seq[String],
    targetColumnName: String,
    resultDoubles: Seq[Double]): Scorable = {

    val mockParameters = mock[RandomForestParameters]

    val mockModel = createRegressionModelMock(
      expectedInput = inputVectors,
      output = resultDoubles)

    TrainedRandomForestRegression(mockParameters, mockModel, featureColumnNames, targetColumnName)
  }

  private def createRegressionModelMock(
    expectedInput: Seq[SparkVector],
    output: Seq[Double]): RandomForestModel = {

    val mockModel = mock[RandomForestModel]

    when(mockModel.predict(any[RDD[SparkVector]]())).thenAnswer(
      constructRegressionModelMockAnswer(expectedInput, output))

    mockModel
  }
}
