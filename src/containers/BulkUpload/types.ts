import {
	BulkMemeMetadata,
	BulkUploadProgress,
	MemeUploadResult,
} from 'src/service/bulkMeme';

export interface FileWithMetadata {
	file: File;
	preview: string;
	metadata: BulkMemeMetadata;
	id: string;
}

export interface UploadState {
	isUploading: boolean;
	uploadId: string | null;
	progress: BulkUploadProgress | null;
	results: MemeUploadResult[];
}

export interface FileCardProps {
	fileData: FileWithMetadata;
	onRemove: (id: string) => void;
	onEdit: (id: string) => void;
}

export interface DropZoneProps {
	hasFiles: boolean;
	onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
	onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
	onClick: () => void;
	children: React.ReactNode;
}

export interface FileStatsProps {
	files: FileWithMetadata[];
	onClearAll: () => void;
	onUploadAll: () => void;
}
