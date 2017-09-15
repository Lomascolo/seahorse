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

package io.deepsense.deeplang.params.datasource

import java.util.UUID

import spray.json._
import io.deepsense.deeplang.params.AbstractParamSpec

class DatasourceIdForWriteParamSpec extends AbstractParamSpec[UUID, DatasourceIdForWriteParam] {

  override def className: String = "DatasourceIdForWriteParam"

  override def paramFixture: (DatasourceIdForWriteParam, JsValue) = {
    val param = DatasourceIdForWriteParam(
      name = "Ds for write parameter name",
      description = "Ds for write parameter description")
    val expectedJson = JsObject(
      "type" -> JsString("datasourceIdForWrite"),
      "name" -> JsString(param.name),
      "description" -> JsString(param.description),
      "default" -> JsNull,
      "isGriddable" -> JsFalse
    )
    (param, expectedJson)
  }

  override def valueFixture: (UUID, JsValue) = {
    val value = UUID.randomUUID()
    (value, JsString(value.toString))
  }
}
