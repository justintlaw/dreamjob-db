import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as DreamjobDb from '../lib/dreamjob-db-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new DreamjobDb.DreamjobDbStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
