# Generated by Django 3.2.5 on 2021-07-11 22:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_chessgame_guest'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chessgame',
            name='max_time',
            field=models.IntegerField(default=600),
        ),
    ]
