import React from 'react';
import { Subscribe, Provider } from 'unstated';

export default function(injectMap, { singleton = true } = {}) {
  const keys = Object.keys(injectMap);
  const values = keys.map(key => injectMap[key]);

  return Target => {
    return props => {
      const content = (
        <Subscribe to={values}>
          {(...args) => {
            const map = {};
            keys.forEach((key, index) => {
              map[key] = args[index];
            });
            return <Target {...props} {...map} />;
          }}
        </Subscribe>
      );

      if (singleton) {
        return content;
      }

      return <Provider>{content}</Provider>;
    };
  };
}
