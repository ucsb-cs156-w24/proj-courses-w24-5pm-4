import React from "react";

import PersonalSchedulesEditPage from "main/pages/PersonalSchedules/PersonalSchedulesEditPage";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import { personalScheduleFixtures } from "fixtures/personalScheduleFixtures";
import { rest } from "msw";

export default {
  title: "pages/PersonalSchedules/PersonalSchedulesEditPage",
  component: PersonalSchedulesEditPage,
};

const Template = () => <PersonalSchedulesEditPage storybook={true}/>;

export const Default = Template.bind({});

Default.parameters = {
    msw: [
        rest.get('/api/currentUser', (_req, res, ctx) => {
            return res( ctx.json(apiCurrentUserFixtures.userOnly));
        }),
        rest.get('/api/systemInfo', (_req, res, ctx) => {
            return res(ctx.json(systemInfoFixtures.showingNeither));
        }),
        rest.get('/api/personalschedules', (_req, res, ctx) => {
            return res(ctx.json(personalScheduleFixtures.threePersonalSchedules[0]));
        }),
        rest.put('/api/personalschedules', async (req, res, ctx) => {
            var reqBody = await req.text();
            window.alert("PUT: " + req.url + " and body: " + reqBody);
            return res(ctx.status(200),ctx.json({}));
        }),
    ],
}