import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";
import { resourceFromAttributes } from "@opentelemetry/resources";

import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from "@opentelemetry/semantic-conventions";

const resources = resourceFromAttributes({
  [ATTR_SERVICE_NAME]: "my-backend-service",
  [ATTR_SERVICE_VERSION]: "1.0.0",
});
const traceExporter = new OTLPTraceExporter({
  url: "http://localhost:4317",
});

const sdk = new NodeSDK({
  resource: resources,
  traceExporter: traceExporter,
  instrumentations: [
    getNodeAutoInstrumentations({
      "@opentelemetry/instrumentation-fs": {
        enabled: false,
      },
    }),
  ],
});

try {
  sdk.start();
  console.log("🚀 Tracing initialized successfully");
} catch (error) {
  console.log("❌ Error initializing tracing:", error);
}

const shutDown = () => {
  sdk
    .shutdown()
    .then(() => console.log("Tracing terminated"))
    .catch((error) => console.log("Error terminating tracing", error))
    .finally(() => process.exit(0));
};

process.on("SIGTERM", shutDown);
process.on("SIGINT", shutDown);
export default sdk;
