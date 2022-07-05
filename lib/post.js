'use strict';
const { Sequelize, DataTypes } = require('sequelize');

//本番環境用の設定（Herokuでデータベースと接続する際に必要）
const dialectOptions = {
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
};

//本番環境（Heroku）かどうかで、使用するデータベースを切り替える
//（process.env.DATABASE_URLという環境変数が存在する場合は、Herokuの本番環境と判定する）
const sequelize = process.env.DATABASE_URL ?

  //本番環境
  new Sequelize(
    process.env.DATABASE_URL,
    {
      logging: false,
      dialectOptions
    }
  )

  :

  //開発環境
  new Sequelize(
    'postgres://postgres:postgres@db/nn_chat',
    {
      logging: false
    }
  );
const Post = sequelize.define(
  'Post',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    content: {
      type: DataTypes.TEXT
    },
    postedBy: {
      type: DataTypes.STRING
    }
  },
  {
    freezeTableName: true,
    timestamps: true
  }
);

Post.sync();
module.exports = Post;