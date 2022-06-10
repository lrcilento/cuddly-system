# cuddly-system

## How to run the application (backend)

First of all, it's necessary to generate a new Django secret key with the code bellow:

```
from django.core.management.utils import get_random_secret_key

print(get_random_secret_key())
```

After that, it's necessary to create a config.py file at the root of the project with a variable called KEY and the value being the random key that you previously generated, for example ```KEY = 'THE GENERATED SECRET KEY GOES HERE'```. After you did these steps, you can follow the commands bellow to initialize the application.

### Linux

```
pip3 install -r requirements.txt
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver
```

### Windows

```
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

## Additional information

### Troubleshooting

If you're having problems with any of the commands on the "How to run the application" section, try 'python3' instead of 'python' and/or 'pip3' instead of 'pip'.
