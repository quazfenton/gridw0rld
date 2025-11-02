// Secure configuration module
// This would typically be implemented server-side to protect credentials
// Client-side credentials can be compromised, so in a production environment
// you would need to implement a server proxy

class CloudGalleryConfig {
  constructor() {
    // Default configuration - these should be overridden via environment or server
    this.config = {
      // DigitalOcean Spaces Configuration
      digitalOcean: {
        enabled: false,
        endpoint: '', // e.g., 'https://nyc3.digitaloceanspaces.com'
        bucket: '',
        region: '',   // e.g., 'nyc3'
        // In production, access keys should not be stored client-side
        // Use a server proxy with signed URLs instead
        accessKeyId: '',
        secretAccessKey: ''
      },
      
      // IPFS Configuration
      ipfs: {
        enabled: false,
        gatewayUrl: 'https://ipfs.io/ipfs/', // Default public gateway
        // Alternative gateways: 'https://dweb.link/ipfs/', 'https://cloudflare-ipfs.com/ipfs/'
        pinataApiKey: '', // If using Pinata for pinning
        pinataSecretApiKey: ''
      },
      
      // Google Cloud Storage Configuration
      googleCloud: {
        enabled: false,
        bucketName: '',
        projectId: '',
        // For client-side implementation, use Firebase or signed URLs
        // Never store private keys client-side in production
        firebaseConfig: {
          apiKey: '',
          authDomain: '',
          projectId: '',
          storageBucket: '',
          messagingSenderId: '',
          appId: ''
        }
      },
      
      // Local storage fallback
      local: {
        enabled: true,
        mediaPath: './content/'
      },
      
      // General settings
      settings: {
        maxConcurrentLoads: 5,
        preloadDistance: 2, // Preload 2 items ahead/behind
        smoothScrollDuration: 500,
        autoPlayVideos: true,
        autoPlayAudio: false // Usually disabled to comply with browser policies
      }
    };
  }

  // Initialize configuration from a secure source
  async initialize(credentialsSource = 'server') {
    try {
      if (credentialsSource === 'server') {
        // Fetch configuration from a secure backend endpoint
        const response = await fetch('/api/gallery-config', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.getAuthToken()}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const serverConfig = await response.json();
          this.mergeConfig(serverConfig);
        }
      }
    } catch (error) {
      console.warn('Could not load server config, using defaults:', error);
      // Use default configuration
    }
  }

  // Merge server config with local defaults
  mergeConfig(serverConfig) {
    this.config = { ...this.config, ...serverConfig };
  }

  // Get authentication token (implement your auth method)
  getAuthToken() {
    // In a real implementation, you'd retrieve this from secure storage
    // or implement proper authentication
    return localStorage.getItem('galleryAuthToken') || sessionStorage.getItem('galleryAuthToken');
  }

  // Get configuration for specific service
  getServiceConfig(service) {
    return this.config[service] || null;
  }

  // Check if a service is enabled
  isServiceEnabled(service) {
    const serviceConfig = this.getServiceConfig(service);
    return serviceConfig ? serviceConfig.enabled : false;
  }

  // Validate configuration
  validateConfig() {
    const errors = [];
    
    if (this.isServiceEnabled('digitalOcean')) {
      const doConfig = this.getServiceConfig('digitalOcean');
      if (!doConfig.endpoint || !doConfig.bucket || !doConfig.region) {
        errors.push('DigitalOcean: Missing required configuration (endpoint, bucket, region)');
      }
    }
    
    if (this.isServiceEnabled('googleCloud')) {
      const gcConfig = this.getServiceConfig('googleCloud');
      if (!gcConfig.bucketName || !gcConfig.projectId) {
        errors.push('Google Cloud: Missing required configuration (bucketName, projectId)');
      }
    }
    
    if (this.isServiceEnabled('ipfs') && !this.getServiceConfig('ipfs').gatewayUrl) {
      errors.push('IPFS: Missing gateway URL');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Get safe config for client-side use (without sensitive credentials)
  getPublicConfig() {
    const publicConfig = { ...this.config };
    
    // Remove sensitive information
    if (publicConfig.digitalOcean) {
      delete publicConfig.digitalOcean.secretAccessKey;
      delete publicConfig.digitalOcean.accessKeyId;
    }
    
    if (publicConfig.ipfs) {
      delete publicConfig.ipfs.pinataSecretApiKey;
      delete publicConfig.ipfs.pinataApiKey;
    }
    
    if (publicConfig.googleCloud) {
      delete publicConfig.googleCloud.firebaseConfig;
    }
    
    return publicConfig;
  }
}

// Export for use in gallery
const galleryConfig = new CloudGalleryConfig();
export default galleryConfig;