# Use official Python image from Docker Hub
FROM python:3.11-slim

# Set the working directory for the backend
WORKDIR /app

# Copy only the backend-related files first to optimize build cache
COPY ./app /app

# Install the dependencies
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port that FastAPI will run on
EXPOSE 8000

# Command to run the FastAPI server using Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
