import React, { useEffect, useState } from 'react';
import { Collapse } from 'antd';
import { getApi } from "../../Services/apiCaller";

const App = () => {
    const [conferencesData, setConferencesData] = useState([]);
    const [speakersData, setSpeakersData] = useState([]);
    const [venuesData, setVenuesData] = useState([]);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getApi({
                url: `http://localhost:3005/conference`,
                method: "Get",
            });

            const conferences = data.data.items;
            const groupedConferences = conferences.reduce((acc, conference) => {
                const type = conference.type;
                if (!acc[type]) {
                    acc[type] = [];
                }
                acc[type].push(conference);
                return acc;
            }, {});

            setConferencesData(groupedConferences);
        };

        fetchData();
    }, [counter]);

    useEffect(() => {
        const fetchSpeakers = async () => {
            const { data } = await getApi({
                url: `http://localhost:3005/speaker`,
                method: "Get",
            });
            setSpeakersData(data.data);
        };

        fetchSpeakers();
    }, [counter]);

    useEffect(() => {
        const fetchVenues = async () => {
            const { data } = await getApi({
                url: `http://localhost:3005/venue`,
                method: "Get",
            });
            setVenuesData(data.data);
        };

        fetchVenues();
    }, [counter]);

    return (
        <Collapse bordered={false} accordion size='large'>
            <Collapse.Panel key="1" header="Conference">
                <ul>
                    {conferencesData.presentation && (
                        <li>Presentation: {conferencesData.presentation.length}</li>
                    )}
                    {conferencesData.session && (
                        <li>Session: {conferencesData.session.length}</li>
                    )}
                    {conferencesData.workshop && (
                        <li>Workshop: {conferencesData.workshop.length}</li>
                    )}
                </ul>
            </Collapse.Panel>
            <Collapse.Panel key="2" header="Speaker">
                <ul>
                    <li>Name: {speakersData.name}</li>
                    <li>Expertise: {speakersData.expertise}</li>
                </ul>
            </Collapse.Panel>
            <Collapse.Panel key="3" header="Venue">
                <ul>
                    <li>Type of event: {venuesData.type}</li>
                </ul>
            </Collapse.Panel>
        </Collapse>
    );
};

export default App;
