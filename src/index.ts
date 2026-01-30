import express from 'express';
import { ExtractionRequestSchema } from './api/validation';
import { ExtractionService } from './services/extraction_service';
import { logger } from './utils/logger';

const app = express();
app.use(express.json());

const extractionService = new ExtractionService();

app.post('/v1/extract', async (req, res) => {
  try {
    // 1. Validate Input at the boundary
    const validatedData = ExtractionRequestSchema.parse(req.body);

    // 2. Execute Business Logic
    const result = await extractionService.extractBrandDNA(validatedData);

    return res.status(200).json(result);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: 'INVALID_INPUT', details: error.errors });
    }
    return res.status(500).json({ error: 'INTERNAL_SERVER_ERROR' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
