export const UPLOAD_CONFIG = {
	MAX_FILES: 50,
	MAX_FILE_SIZE: 10 * 1024 * 1024,
	ACCEPTED_FILE_TYPES: 'image/*',
} as const;

export const DROPZONE_CLASSES = {
	EMPTY: 'hover:cursor-pointer bg-gray-100 hover:bg-gray-200',
	WITH_FILES: 'cursor-default bg-white p-6',
	BASE: 'flex min-h-96 flex-col items-center justify-center rounded-xl border-2 border-dashed border-violet-900 p-6 text-center transition-all duration-300 sm:p-12',
} as const;
