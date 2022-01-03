import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { unionBy } from 'lodash';

const ChangelogWrapper = styled.div`
    .titleHeader {
        margin-bottom: 10px;
    }

    .labelItem {
        margin-bottom: 10px;
        margin-right: 8px;
    }

    .sidebar {
        min-width: 250px;
    }
    .markdown img {
        display: block;
        max-width: 100%;
        max-height: 400px;
    }

    .markdown .heading,
    .markdown .heading > div {
        font-size: 17px;
        line-height: 24px;
        font-weight: 700;
    }

    .markdown .line {
        display: block;
        margin: 0 0 15px;
        word-break: break-word;
        font-size: 15px;
        line-height: 22px;
        white-space: pre-wrap;
    }

    .markdown h1 {
        font-size: 17px;
        line-height: 24px;
        font-weight: 700;
    }

    .markdown ol li,
    .markdown ul li {
        font-size: 15px;
        line-height: 22px;
    }

    .header {
        font-size: 20px;
    }

    p,
    a {
        color: rgb(51, 51, 51);
    }

    .changelogContainer {
        height: 500px;
        overflow: auto;
    }

    .changeLog .markdown {
        margin-left: 10px;
    }

    .changeLog .markdown:after {
        position: absolute;
        z-index: 100;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, 0) 70%, hsla(0, 0%, 100%, 0.2) 90%, #fff);
        pointer-events: none;
    }

    .changeLog:not(:last-child) {
        border-bottom: 1px solid #ddd;
        padding-bottom: 40px;
    }

    .changeLog:not(:first-child) {
        margin: 75px 0px;
    }

    .label {
        background: gray;
        margin-right: 5px;
        border-radius: 4px;
        padding: 4px;
        font-size: 11px;
    }
`;

export interface ChangelogsProps {
    url: string;
    limit: number;
    types?: 'newest' | 'oldest' | 'relevance';
    currentUser: unknown;
}

interface entry {
    title: string;
    markdownDetails: string;
    value: string;
    id: string;
    private: boolean;
    mentions: [any];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    posts: [any, ...any[]];
}

interface label {
    created: string;
    entryCount: number;
    id: string;
    name: string;
}

const Changelogs: React.FC<ChangelogsProps> = ({ url, types, limit }) => {
    const [entries, setEntries] = useState<entry[]>([]);
    const [labels, setLabels] = useState<label[]>([]);
    useEffect(() => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                action: 'canny',
                subaction: 'getChangelogs',
            },
            body: JSON.stringify({ path: 'entries/list', types: types, limit: 100 }),
        })
            .then((response) => response.json())
            .then(
                (item) => {
                    console.log('CSK item', item);

                    const alllabels: any[] = [];
                    item.entries.filter((entry: { labels: string | any[] }) => {
                        console.log('CSK entry ', entry.types);
                        for (let i = 0; i < entry.labels.length; i++) {
                            alllabels.push(entry.labels[i]);
                        }
                    });
                    setEntries(item.entries);
                    setLabels(unionBy(alllabels, [], 'id'));
                    console.log('CSK alllabels', alllabels);
                },
                (error) => {
                    console.log(' error', error);
                },
            );
    }, [types, limit]);

    return (
        <ChangelogWrapper className="flex">
            <div className="sidebar">
                <div className="titleHeader">Labels</div>
                {labels.map((label: label) => {
                    return (
                        <div key={label.id} className="labelItem">
                            <input type="checkbox" value="Male" name={label.name} /> {label.name}
                        </div>
                    );
                })}
            </div>
            <div className="changelogContainer">
                {entries.map((entry) => {
                    return (
                        <div className="changeLog" key={entry.id}>
                            <div>
                                <div className="header grow">{entry.title}</div>
                                <div className="flex mt10">
                                    {labels.map((label: label) => {
                                        return (
                                            <div key={label.id} className="label uppercase">
                                                {label.name}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <ReactMarkdown className="markdown">{entry.markdownDetails}</ReactMarkdown>
                        </div>
                    );
                })}
            </div>
        </ChangelogWrapper>
    );
};

Changelogs.defaultProps = {
    types: 'newest',
};

Changelogs.propTypes = {
    limit: PropTypes.number.isRequired,
    types: PropTypes.oneOf(['newest', 'oldest', 'relevance', 'statusChanged']),
    url: PropTypes.string.isRequired,
    currentUser: PropTypes.object,
};

export default Changelogs;
