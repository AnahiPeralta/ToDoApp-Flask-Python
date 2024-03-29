from flask import Flask, render_template, request, redirect, flash
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todos.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key'  # Se debe cambiar a una clave secreta segura
db = SQLAlchemy(app)

class Todos(db.Model):
    _id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    date = db.Column(db.Date, default=datetime.utcnow().date)
    status = db.Column(db.String(50), nullable=False)
    priority = db.Column(db.String(50), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    subtasks = db.relationship('Subtasks', backref='parent_task', lazy=True)

class Subtasks(db.Model):
    _id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(500), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    task_id = db.Column(db.Integer, db.ForeignKey('todos._id'), nullable=False)

#with app.app_context():
    #db.create_all()

@app.route('/' , methods=['POST', 'GET'])
def home():
    try:
        if request.method == 'POST':
            title = request.form['title']
            description = request.form['description']
            status = request.form['status']
            priority = request.form['priority']
            todo = Todos(title=title, description=description, status=status, priority=priority)

            # Obtener subtareas y crearlas
            subtasks_data = request.form.getlist('subtasks')
            for subtask_desc in subtasks_data:
                subtask = Subtasks(description=subtask_desc, parent_task=todo)
                db.session.add(subtask)

            db.session.commit()
            flash('Tarea creada exitosamente', 'success')
            return redirect('/')
        
        all_todos = Todos.query.all()
        return render_template('index.dj', todos=all_todos)
    except Exception as e:
        flash(f'Ocurrio un error: {str(e)}', 'error')
        return redirect('/')

@app.route('/delete/<int:_id>')
def delete(_id):
    try:
        todo = Todos.query.get(_id)
        if todo:
            for subtask in todo.subtasks:
                db.session.delete(subtask)
            db.session.delete(todo)
            db.session.commit()
            flash('Tarea eliminada exitosamente', 'success')
        else:
            flash('La tarea no fue encontrada', 'error')
        return redirect('/')
    except Exception as e:
        flash(f'Ocurrió un error: {str(e)}', 'error')
        return redirect('/')

@app.route('/update/<int:_id>' , methods=['POST', 'GET'])
def update(_id):
    try:
        if request.method == 'POST':
            title = request.form['title']
            description = request.form['description']
            status = request.form['status']
            priority = request.form['priority']
            completed = 'completed' in request.form

            todo = Todos.query.get(_id)
            if todo:
                todo.title = title
                todo.description = description
                todo.status = status
                todo.priority = priority
                todo.completed = completed

                for subtask in todo.subtasks:
                    subtask_id = subtask._id
                    subtask_desc = request.form.get(f'subtask{subtask_id}')
                    subtask_completed = request.form.get(f'subtask_completed{subtask_id}') == 'on'
                    subtask.description = subtask_desc
                    subtask.completed = subtask_completed

                todo.completed = all(subtask.completed for subtask in todo.subtasks)
                db.session.commit()
                flash('Tarea actualizada exitosamente', 'success')
            else:
                flash('La tarea no fue encontrada', 'error')
            return redirect('/')
        
        todo = Todos.query.get(_id)
        return render_template('update.dj' , todo=todo)
    except Exception as e:
        flash(f'Ocurrió un error: {str(e)}', 'error')
        return redirect('/')

if __name__ == "__main__":
    # Correr la aplicación en modo de desarrollo
    app.run(debug=True)
