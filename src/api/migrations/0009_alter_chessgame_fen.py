# Generated by Django 3.2.5 on 2021-07-18 23:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_alter_chessgame_code'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chessgame',
            name='fen',
            field=models.TextField(default='start', max_length=500),
        ),
    ]
