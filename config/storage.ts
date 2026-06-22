export const storage = {
  upload_path: process.env.UPLOAD_PATH || './storage/uploads',
  max_file_size: parseInt(process.env.MAX_FILE_SIZE || '10485760', 10),
  temp_dir: process.env.TEMP_DIR || './storage/tmp',
};
