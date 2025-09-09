import React, { useMemo } from 'react';
import { DROPZONE_CLASSES } from '../../../constants/BulkUpload';
import { DropZoneProps } from '../types';

const DropZone: React.FC<DropZoneProps> = React.memo(
	({ hasFiles, onDrop, onDragOver, onClick, children }) => {
		const dropzoneClass = useMemo(
			() =>
				`${DROPZONE_CLASSES.BASE} ${
					hasFiles ? DROPZONE_CLASSES.WITH_FILES : DROPZONE_CLASSES.EMPTY
				}`,
			[hasFiles]
		);

		return (
			<div
				className={dropzoneClass}
				onDrop={onDrop}
				onDragOver={onDragOver}
				onClick={onClick}
			>
				{children}
			</div>
		);
	}
);

export default DropZone;
