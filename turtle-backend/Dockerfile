FROM python:3.8
RUN pip install pipenv
WORKDIR /app 
COPY *.py Pipfile* ./
RUN pipenv sync
CMD ["pipenv", "run", "python", "main.py"]