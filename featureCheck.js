/**
 * Check which features are present, and if so what their value is
 */
export async function checkFeatures() {
  let features = {
    userAgent: navigator.userAgent,
    ..._webAuthn(),
  };

  if (features.webAuthnSupported) {
    features = {
      ...features,
      ...await _isUserVerifyingPlatformAuthenticatorAvailable(),
      ...await _isConditionalMediationAvailable(),
      ...await _getClientCapabilities(),
      ..._jsonSerializationMethods(),
    };
  }

  return features;
}

/**
 * Test WebAuthn support
 */
function _webAuthn() {
  return {
    webAuthnSupported: (
      window?.PublicKeyCredential !== undefined &&
      typeof window.PublicKeyCredential === "function"
    ),
  };
};

/**
 * Test isUserVerifyingPlatformAuthenticatorAvailable()
 */
async function _isUserVerifyingPlatformAuthenticatorAvailable() {
  const toReturn = {
    isUserVerifyingPlatformAuthenticatorAvailablePresent: undefined,
    isUserVerifyingPlatformAuthenticatorAvailable: undefined,
  };

  toReturn.isUserVerifyingPlatformAuthenticatorAvailablePresent = PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable !== undefined;
  if (toReturn.isUserVerifyingPlatformAuthenticatorAvailablePresent) {
    toReturn.isUserVerifyingPlatformAuthenticatorAvailable = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
  }
  return toReturn;
}

/**
 * Test isConditionalMediationAvailable()
 */
async function _isConditionalMediationAvailable() {
  const toReturn = {
    isConditionalMediationAvailablePresent: undefined,
    isConditionalMediationAvailable: undefined,
  };

  toReturn.isConditionalMediationAvailablePresent = PublicKeyCredential.isConditionalMediationAvailable !== undefined;
  if (toReturn.isConditionalMediationAvailablePresent) {
    toReturn.isConditionalMediationAvailable = await PublicKeyCredential.isConditionalMediationAvailable();
  }

  return toReturn;
}

/**
 * Test getClientCapabilities()
 */
async function _getClientCapabilities() {
  const toReturn = {
    getClientCapabilitiesPresent: undefined,
    getClientCapabilities: undefined,
  };

  toReturn.getClientCapabilitiesPresent = PublicKeyCredential.getClientCapabilities !== undefined;
  if (toReturn.getClientCapabilitiesPresent) {
    toReturn.getClientCapabilities = await PublicKeyCredential.getClientCapabilities();
  }

  return toReturn;
}

/**
 * Test JSON serialization methods
 */
function _jsonSerializationMethods() {
  return {
    parseCreationOptionsFromJSONPresent: PublicKeyCredential.parseCreationOptionsFromJSONPresent !== undefined,
    parseRequestOptionsFromJSONPresent: PublicKeyCredential.parseRequestOptionsFromJSONPresent !== undefined,
    toJSONPresent: PublicKeyCredential.toJSONPresent !== undefined,
  }
}
