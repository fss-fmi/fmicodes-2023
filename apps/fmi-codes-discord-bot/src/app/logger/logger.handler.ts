import { Logger } from '@nestjs/common';

export const HandleLogging = () => {
  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    // Save a reference to the original method
    const originalMethod = descriptor.value;

    const logger = new Logger(target.constructor.name);

    // Rewrite original method with try/catch wrapper
    descriptor.value = function (...args) {
      logger.log(`START: ${propertyKey}()`);
      try {
        const result = originalMethod.apply(this, args);

        // Check if method is asynchronous
        if (result && result instanceof Promise) {
          // Return promise
          return result.catch((error) => {
            logger.error(`ERROR: ${propertyKey}(): ${error}`);
          });
        }

        // Return actual result
        return result;
      } catch (error) {
        logger.error(`ERROR: ${originalMethod.name}(): ${error}`);
      } finally {
        logger.log(`END: ${propertyKey}()`);
      }
    };

    return descriptor;
  };
};
