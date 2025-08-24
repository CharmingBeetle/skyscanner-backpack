import React from 'react';
import { BpkCode } from '@skyscanner/backpack-web/bpk-component-code';
import BpkButton from '@skyscanner/backpack-web/bpk-component-button';
import BpkText from '@skyscanner/backpack-web/bpk-component-text';
import Calendar from './Calendar';

import { cssModules } from '@skyscanner/backpack-web/bpk-react-utils';

import STYLES from './App.scss';

const getClassName = cssModules(STYLES);

const App = () => (
  <div className={getClassName('App')}>
    <header className={getClassName('App__header')}>
      <div className={getClassName('App__header-inner')}>
        <BpkText tagName="h1" textStyle="xxl" className={getClassName('App__heading')}>Flight Schedule</BpkText>
      </div>
    </header>
    <main className={getClassName('App__main')}>
      <BpkText tagName="p" className={getClassName('App__text')}>
        To get started, edit <BpkCode>src/App.jsx</BpkCode> and save to reload.
      </BpkText>
      <Calendar></Calendar>
      <BpkButton onClick={() => alert('It works!')} className={getClassName('App__continue-button')}>Continue</BpkButton>
    </main>
  </div>
);

export default App;
