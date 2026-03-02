# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name = "driftgate-sdk"
  spec.version = "0.1.0"
  spec.summary = "DriftGate canonical V4 envelope SDK"
  spec.description = "DriftGate Ruby SDK for canonical V4 session and execution APIs."
  spec.authors = ["DriftGate"]
  spec.email = ["support@driftgate.ai"]
  spec.homepage = "https://docs.driftgate.ai"
  spec.license = "Apache-2.0"
  spec.required_ruby_version = ">= 3.0.0"

  spec.metadata = {
    "homepage_uri" => "https://docs.driftgate.ai",
    "source_code_uri" => "https://github.com/driftgate/driftgate-sdk",
    "changelog_uri" => "https://docs.driftgate.ai/changelog"
  }

  spec.files = Dir[
    "lib/**/*.rb",
    "README.md",
    "LICENSE"
  ]
  spec.require_paths = ["lib"]
end
