# Generated by Django 3.2.5 on 2021-07-12 21:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_rename_code_chessgame_codes'),
    ]

    operations = [
        migrations.RenameField(
            model_name='chessgame',
            old_name='codes',
            new_name='code',
        ),
    ]
