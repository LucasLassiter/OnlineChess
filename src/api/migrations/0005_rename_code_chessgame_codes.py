# Generated by Django 3.2.5 on 2021-07-12 21:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20210712_2145'),
    ]

    operations = [
        migrations.RenameField(
            model_name='chessgame',
            old_name='code',
            new_name='codes',
        ),
    ]
