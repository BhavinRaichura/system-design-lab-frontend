"use client"

import {Handle, Position} from "@xyflow/react"

type AwsNodeProps = {
    data: {
        label: string;
        type: string;
        category: string;
    };
};

export default function AwsNode({data}: AwsNodeProps) {
    return (
        <div>
            <Handle type="target" position={Position.Left} />
            <div>{data.label}</div>
            <Handle type="source" position={Position.Right} />
        </div>
    )
}

